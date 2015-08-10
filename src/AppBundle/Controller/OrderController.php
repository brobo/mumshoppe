<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Order;

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

}

?>
