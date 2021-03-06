<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Accessory;
use AppBundle\Entity\AccessoryAssociation;
use AppBundle\Form\AccessoryType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/accessory")
 */
class AccessoryController extends ImageController {

	public function getAccessoryManager() {
		return $this->get("accessory_manager");
	}

	public function getEntityManager() {
		return $this->getAccessoryManager();
	}

	public function __construct() {
		parent::__construct('Accessory', 'AccessoryType');
	}

	/**
	 * @Route("/{accessoryId}/mum/{mumId}/{quantity}")
	 * @Method({"PUT"})
	 */
	public function mumAssociation($accessoryId, $mumId, $quantity) {
		$em = $this->getDoctrine()->getManager();
		$repo = $em->getRepository('AppBundle:AccessoryAssociation');

		$mum = $em->getRepository('AppBundle:Mum')->findById($mumId);
		$accessory = $em->getRepository('AppBundle:Accessory')->findById($accessoryId);

		if (!$mum || !$accessory) {
			return $this->fail();
		}

		var_dump($mum);

		$association = new AccessoryAssociation($mum, $accessory, $quantity);
		$em->persist($association);
		$em->flush();

		return $this->succeed();
	}

	// /**
	//  * @Route("/")
	//  * @Method({"GET"})
	//  */
	// public function indexAction() {
	// 	$accessories = $this->getAccessoryManager()->findAll();

	// 	return $this->respondJson($accessories);
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"GET"})
	//  */
	// public function showAction($id) {
	// 	$accessory = $this->getAccessoryManager()->findById($id);

	// 	if ($accessory === null) {
	// 		return $this->fail();
	// 	} else {
	// 		return $this->respondJson($accessory);
	// 	}
	// }

	// /**
	//  * @Route("/")
	//  * @Method({"POST"})
	//  */
	// public function postAction(Request $request) {
	// 	$accessory = new Accessory();

	// 	$form = $this->createForm(new AccessoryType(), $accessory);
	// 	$form->submit($request->request->all());

	// 	if ($form->isValid()) {
	// 		$this->getAccessoryManager()->save($accessory);
	// 		return $this->respondJson($accessory, 200);
	// 	} else {
	// 		return $this->fail($form->getErrors());
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"PUT"})
	//  */
	// public function putAction(Request $request, $id) {
	// 	$accessory = $this->getAccessoryManager()->findById($id);

	// 	if ($accessory === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$form = $this->createForm(new AccessoryType(), $accessory);
	// 		$form->submit($request->request->all());

	// 		if ($form->isValid()) {
	// 			$this->getAccessoryManager()->save($accessory);
	// 			return $this->respondJson($accessory);
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
	// 	$accessory = $this->getAccessoryManager()->findById($id);

	// 	if ($accessory === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$this->getAccessoryManager()->delete($accessory);
	// 		return $this->succeed();
	// 	}
	// }
}