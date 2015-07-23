<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Backing;
use AppBundle\Form\BackingType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/backing")
 */
class BackingController extends ImageController {

	public function getBackingManager() {
		return $this->get("backing_manager");
	}

	public function getEntityManager() {
		return $this->getBackingManager();
	}

	public function __construct() {
		parent::__construct('Backing', 'BackingType');
	}

	// /**
	//  * @Route("/")
	//  * @Method({"GET"})
	//  */
	// public function indexAction() {
	// 	$backings = $this->getBackingManager()->findAll();

	// 	return $this->respondJson($backings);
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"GET"})
	//  */
	// public function showAction($id) {
	// 	$backing = $this->getBackingManager()->findById($id);

	// 	if ($backing === null) {
	// 		return $this->fail();
	// 	} else {
	// 		return $this->respondJson($backing);
	// 	}
	// }

	// /**
	//  * @Route("/")
	//  * @Method({"POST"})
	//  */
	// public function postAction(Request $request) {
	// 	$backing = new Backing();
	// 	$form = $this->createForm(new BackingType(), $backing);

	// 	$form->submit($request->request->all());
	// 	if ($form->isValid()) {
	// 		$this->getBackingManager()->save($backing);
	// 		return $this->respondJson($backing, 200);
	// 	} else {
	// 		return $this->fail($form->getErrors());
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"PUT"})
	//  */
	// public function putAction(Request $request, $id) {
	// 	$backing = $this->getBackingManager()->findById($id);

	// 	if ($backing === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$form = $this->createForm(new BackingType(), $backing);

	// 		$form->submit($request->request->all());
	// 		if ($form->isValid()) {
	// 			$this->getBackingManager()->save($backing);
	// 			return $this->respondJson($backing);
	// 		} else {
	// 			return $this->fail($form->getErrors());
	// 		}
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"DELETE"})
	//  */
	// public function deleteAction($id) {
	// 	$backing = $this->getBackingManager()->findById($id);

	// 	if ($backing === null) {
	// 		return $this->fail();
	// 	}  else {
	// 		$this->getBackingManager()->delete($backing);
	// 		return $this->succeed();
	// 	}
	// }

}

?>