<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Order;
use AppBundle\Entity\Transaction;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("api/order")
 */
class OrderController extends RestController {

	public function getOrderManager() {
		return $this->get('order_manager');
	}

	public function getEntityManager() {
		return $this->getOrderManager();
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$order = $this->getOrderManager()->findById($id);

		if ($order === null) {
			return $this->fail();
		} else {
			return $this->respondJson($order);
		}
	}

	/**
	 * @Route("/{customerId}/{mumId}")
	 * @Method({"POST"})
	 */
	public function postAction($customerId, $mumId) {
		$customer = $this->get('customer_manager')->findById($customerId);
		$mum = $this->get('mum_manager')->findById($mumId);

		if (!$customer || !$mum) {
			return $this->fail();
		}

		$order = new Order($customer, $mum);
		$this->getOrderManager()->save($order);
		return $this->respondJson($order, 200);
	}

	/**
	 * @Route("/{id}/pay")
	 * @Method({"GET"})
	 */
	public function initiatePayment($id) {
		$order = $this->getOrderManager()->findById($id);
		if (!$order) {
			return $this->fail();
		}
		if ($order->getDeposited() && $order->getPaid()) {
			return $this->fail();
		}

		$price = !$order->getDeposited() ? 1 : 100 - 25;

		$clientId = $this->container->getParameter('paypal_client_id');
		$secret = $this->container->getParameter('paypal_secret');
		$sdkConfig = $this->container->getParameter('paypal_sdk_config');
		$cred = new \PayPal\Auth\OAuthTokenCredential($clientId, $secret);
		$accessToken = $cred->getAccessToken($sdkConfig);
		$apiContext = new \PayPal\Rest\ApiContext($cred);
		$apiContext->setConfig($sdkConfig);

		$payer = new \PayPal\Api\Payer();
		$payer->setPaymentMethod('paypal');

		$amount = new \PayPal\Api\Amount();
		$amount->setCurrency('USD');
		$amount->setTotal($price);

		$transaction = new \PayPal\Api\Transaction();
		$transaction->setDescription('7L High School Mum Shoppe');
		$transaction->setAmount($amount);

		$redirectUrls = new \PayPal\Api\RedirectUrls();
		$redirectUrls->setReturnUrl('http://127.0.0.1/mumshoppe/web/app_dev.php/shop#/pay/' . $order->getId());
		$redirectUrls->setCancelUrl('http://127.0.0.1/mumshoppe/web/app_dev.php/shop');

		$payment = new \PayPal\Api\Payment();
		$payment->setIntent('sale');
		$payment->setPayer($payer);
		$payment->setRedirectUrls($redirectUrls);
		$payment->setTransactions(array($transaction));

		$response = $payment->create($apiContext);

		foreach ($response->getLinks() as $link) {
			if ($link->getRel() === 'approval_url') {

				return $this->respondJson(array(
					'success' => true,
					'access_token' => $cred,
					'location' => $link->getHref(),
					'payment_id' => $response->getId()
				));

			}
		}

		return $this->fail();
	}

	/**
	 * @Route("/{id}/pay/")
	 * @Method({"POST"})
	 */
	public function finalizePayment(Request $request, $id) {
		try {
			$cred = $request->request->get('access_token');
			$payment_id = $request->request->get('payment_id');
			$payer_id = $request->request->get('payer_id');
			if (!$cred || !$payment_id || !$payer_id) {
				throw new Error();
			}
		} catch (Exception $ex) {
			return $this->fail();
		}

		$order = $this->getOrderManager()->findById($id);
		if (!$order) {
			return $this->fail();
		}
		if ($order->getDeposited() && $order->getPaid()) {
			return $this->fail();
		}

		$clientId = $this->container->getParameter('paypal_client_id');
		$secret = $this->container->getParameter('paypal_secret');
		$sdkConfig = $this->container->getParameter('paypal_sdk_config');
		$cred = new \PayPal\Auth\OAuthTokenCredential($clientId, $secret);
		$apiContext = new \PayPal\Rest\ApiContext($cred);
		$apiContext->setConfig($sdkConfig);	
	
		$payment = new \PayPal\Api\Payment();
		$payment->setId($payment_id);
		$execution = new \PayPal\Api\PaymentExecution();
		$execution->setPayerId($payer_id);
		try {
			$payment->execute($execution, $apiContext);
		} catch (Exception $ex) {
			return $this->fail();
		}

		$transaction = new Transaction($payment_id, new \DateTime('now'));

		if (!$order->getDeposited()) {
			$order->setDeposited(true);
			$order->setDeposit($transaction);
		} else {
			$order->setPaid(true);
			$order->setPayment($transaction);
		}

		$em = $this->getDoctrine()->getManager();
		$em->persist($transaction);
		$em->persist($order);
		$em->flush();

		return $this->succeed();
	}
}

?>
