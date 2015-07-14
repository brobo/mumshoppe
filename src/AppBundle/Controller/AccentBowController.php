<?php
namespace AppBundle\Controller;

use AppBundle\Entity\AccentBow;
use AppBundle\Form\AccentBowType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/accentbow")
 */
class AccentBowController extends RestController {

	public function getAccentBowManager() {
		return $this->get("accentbow_manager");
	}

	/**
	 * @Route("/")
	 * @Method({"GET"})
	 */
	public function indexAction() {
		$bows = $this->getAccentBowManager()->findAll();

		return $this->respondJson($bows);
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$bow = $this->getAccentBowManager()->findById($id);

		if ($bow === null) {
			return $this->fail();
		} else {
			return $this->respondJson($bow);
		}
	}

	/**
	 * @Route("/")
	 * @Method({"POST"})
	 */
	public function postAction(Request $request) {
		$bow = new AccentBow();

		$form = $this->createForm(new AccentBowType(), $bow);
		$form->submit($request->request->all());

		if ($form->isValid()) {
			$this->getAccentBowManager()->save($bow);
			return $this->respondJson($bow);
		} else {
			return $this->fail($form->getErrors());
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"PUT"})
	 */
	public function putAction(Request $request, $id) {
		$bow = $this->getAccentBowManager()->findById($id);

		if ($bow === null) {
			return $this->fail();
		} else {
			$form = $this->createForm(new AccentBowType(), $bow);
			$form->submit($request->request->all());

			if ($form->isValid()) {
				$this->getAccentBowManager()->save($bow);
				return $this->respondJson($bow);
			} else {
				return $this->fail($form->getErrors());
			}
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"DELETE"})
	 */
	public function deleteAction($id) {
		$bow = $this->getAccentBowManager()->findById($id);

		if ($bow === null) {
			return $this->fail();
		} else {
			$this->getAccentBowManager()->delete($bow);
			return $this->succeed();
		}
	}
}