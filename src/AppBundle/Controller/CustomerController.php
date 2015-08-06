<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Token;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use \Firebase\JWT\JWT;

/**
 * @Route("/api/customer")
 */
class CustomerController extends EntityController {

	public function getCustomerManager() {
		return $this->get('customer_manager');
	}

	public function getEntityManager() {
		return $this->getCustomerManager();
	}

	public function __construct() {
		return parent::__construct('Customer', 'CustomerType');
	}

	/**
	 * @Route("/login")
	 * @Method({"PUT"})
	 */
	public function login(Request $request) {
		$email = $request->request->get('customer_email');
		$password = $request->request->get('customer_password');

		$customer = $this->getCustomerManager()->getRepo()->findOneByEmail($email);

		if (!$customer) {
			return $this->fail();
		}

		$em = $this->getDoctrine()->getManager();

		if ($customer->verifyPassword($password)) {
			$expire = new \DateTime('now');
			$expire->modify('+20 minute');
			$token = new Token($expire);

			if ($customer->getToken()) {
				$em->remove($customer->getToken());
			}
			$customer->setToken($token);

			$em->persist($token);
			$em->persist($customer);
			$em->flush();

			$key = $this->container->getParameter('jwt_key');
			$payload = array(
				'type' => 'customer',
				'user_id' => $customer->getId(),
				'token_id' => $token->getId(),
				'expires' => $token->getExpires()
			);

			return $this->respondJson(array(
				'jwt' => JWT::encode($payload, $key)
			));
		}

		return $this->fail();
	}
}
