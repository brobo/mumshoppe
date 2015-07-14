<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Bear;
use AppBundle\Form\BearType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/customer")
 */
class CustomerController extends RestController {

	public function getCustomerManager() {
		return $this->get('customer_manager');
	}

	/**
	 * @Route("/")
	 * @Method({"GET"})
	 */
	public function indexAction() {
		$customers = $this->getCustomerManager()->findAll();

		return $this->respondJson($customers);
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$customer = $this->getCustomerManager()->findById($id);

		if ($customer === null) {
			return $this->fail();
		} else {
			return $this->respondJson($customer);
		}
	}

	/**
	 * @Route("/")
	 * @Method({"POST"})
	 */
	public function postAction(Request $request) {
		$customer = new Customer();

		$form = $this->createForm(new CustomerType(), $customer);
		$form->submit($request->request->all());

		if ($form->isValid()) {
			$this->getCustomerManager()->save($customer);

			return $this->respondJson($customer, 200);
		} else {
			$this->fail($form->getErrors());
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"PUT"})
	 */
	public function putAction(Request $request, $id) {
		$customer = $this->getCustomerManager()->findById($id);

		if ($customer === null) {
			return $this->fail();
		} else {
			$form = $this->createForm(new CustomerType(), $customer);
			$form->submit($request->request->all());

			if ($form->isValid()) {
				return $this->respondJson($customer);
			} else {
				return $this->fail();
			}
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"DELETE"})
	 */
	public function deleteAction($id) {
		$customer = $this->getCustomerManager()->findById($id);

		if ($customer === null) {
			return $this->fail();
		} else {
			$this->getCustomerManager()->delete($customer);

			return $this->succeed();
		}
	}
}