<?php
namespace AppBundle\Controller;

use ReflectionClass;

use AppBundle\Entity\Bear;
use AppBundle\Form\BearType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/bear")
 */
class BearController extends ImageController {

	public function getBearManager() {
		return $this->get('bear_manager');
	}

	protected function getEntityManager() {
		return $this->getBearManager();
	}

	public function __construct() {
		parent::__construct('Bear', 'BearType');
	}

	// /**
	//  * @Route("/")
	//  * @Method({"GET"})
	//  */
	// public function indexAction() {
	// 	$bears = $this->getBearManager()->findAll();

	// 	return $this->respondJson($bears);
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"GET"})
	//  */
	// public function showAction($id) {
	// 	$bear = $this->getBearManager()->findById($id);

	// 	if ($bear === null) {
	// 		return $this->fail();
	// 	} else {
	// 		return $this->respondJson($bear);
	// 	}
	// }

	// /**
	//  * @Route("/")
	//  * @Method({"POST"})
	//  */
	// public function postAction(Request $request) {
	// 	$bear = new Bear();
	// 	$form = $this->createForm(new BearType(), $bear);

	// 	$form->submit($request->request->all());

	// 	if ($form->isValid()) {
	// 		$this->getBearManager()->save($bear);
	// 		return $this->respondJson($bear, 200);
	// 	} else {
	// 		return $this->fail($form->getErrors());
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"PUT"})
	//  */
	// public function putAction(Request $request, $id) {
	// 	$bear = $this->getBearManager()->findById($id);

	// 	if ($bear === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$form = $this->createForm(new BearType(), $bear);

	// 		$form->submit($request->request->all());

	// 		if ($form->isValid()) {
	// 			$this->getBearManager()->save($bear);
	// 			return $this->respondJson($bear, 200);
	// 		} else {
	// 			return $this->fail($form->getErrors());
	// 		}
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"DELETE"})
	//  */
	// public function deleteAction(Request $request, $id) {
	// 	$bear = $this->getBearManager()->findById($id);

	// 	if ($bear === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$this->getBearManager()->delete($bear);
	// 		return $this->succeed();
	// 	}
	// }

}
