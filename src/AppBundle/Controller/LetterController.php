<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Letter;
use AppBundle\Form\LetterType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/letter")
 */
class LetterController extends EntityController {

	public function getLetterManager() {
		return $this->get("letter_manager");
	}

	public function getEntityManager() {
		return $this->getLetterManager();
	}

	public function __construct() {
		parent::__construct('Letter', 'LetterType');
	}

	// /**
	//  * @Route("/")
	//  * @Method({"GET"})
	//  */
	// public function indexAction() {
	// 	$letters = $this->getLetterManager()->findAll();

	// 	return $this->respondJson($letters);
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"GET"})
	//  */
	// public function showAction($id) {
	// 	$letter = $this->getLetterManager()->findById($id);

	// 	if ($letter === null) {
	// 		return $this->fail();
	// 	} else {
	// 		return $this->respondJson($letter);
	// 	}
	// }

	// /**
	//  * @Route("/")
	//  * @Method({"POST"})
	//  */
	// public function postAction(Request $request) {
	// 	$letter = new Letter();

	// 	$form = $this->createForm(new LetterType(), $letter);
	// 	$form->submit($request->request->all());

	// 	if ($form->isValid()) {
	// 		$this->getLetterManager()->save($letter);
	// 		return $this->respondJson($letter, 200);
	// 	} else {
	// 		return $this->fail($form->getErrors());
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"PUT"})
	//  */
	// public function putAction(Request $request, $id) {
	// 	$letter = $this->getLetterManager()->findById($id);

	// 	if ($letter === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$form = $this->createForm(new LetterType(), $letter);
	// 		$form->submit($request->request->all());

	// 		if ($form->isValid()) {
	// 			$this->getLetterManager()->save($letter);
	// 			return $this->respondJson($letter, 200);
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
	// 	$letter = $this->getLetterManager()->findById($id);

	// 	if ($letter === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$this->getLetterManager()->delete($letter);
	// 		return $this->succeed();
	// 	}
	// }

}