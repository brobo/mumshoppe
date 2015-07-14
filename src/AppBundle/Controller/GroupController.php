<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Group;
use AppBundle\Form\GroupType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/group")
 */
class GroupController extends RestController {

	public function getGroupManager() {
		return $this->get('group_manager');
	}

	/**
	 * @Route("/")
	 * @Method({"GET"})
	 */
	public function indexAction() {
		$groups = $this->getGroupManager()->findAll();

		return $this->respondJson($groups);
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$group = $this->getGroupManager()->findById($id);

		if ($group === null) {
			return $this->fail();
		} else {
			return $this->respondJson($group);
		}
	}

	/**
	 * @Route("/")
	 * @Method({"POST"})
	 */
	public function postAction(Request $request) {
		$group = new Group();
		$form = $this->createForm(new GroupType(), $group);

		$form->submit($request->request->all());

		if ($form->isValid()) {
			$this->getGroupManager()->save($group);
			return $this->respondJson($group, 200);
		} else {
			return $this->fail($form->getErrors());
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"PUT"})
	 */
	public function putAction(Request $request, $id) {
		$group = $this->getGroupManager()->findById($id);

		if ($group === null) {
			return $this->fail();
		} else {
			$form = $this->createForm(new GroupType(), $group);

			$form->submit($request->request->all());

			if ($form->isValid()) {
				$this->getGroupManager()->save($group);
				return $this->respondJson($group, 200);
			} else {
				return $this->fail($form->getErrors());
			}
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"DELETE"})
	 */
	public function deleteAction(Request $request, $id) {
		$group = $this->getGroupManager()->findById($id);

		if ($group === null) {
			return $this->fail();
		} else {
			$this->getGroupManager()->delete($group);
			return $this->succeed();
		}
	}

}


?>
