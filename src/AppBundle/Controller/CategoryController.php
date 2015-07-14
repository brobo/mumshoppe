<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Category;
use AppBundle\Form\CategoryType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("api/category")
 */
class CategoryController extends RestController {

	public function getCategoryManager() {
		return $this->get('category_manager');
	}

	/**
	 * @Route("/")
	 * @Method({"GET"})
	 */
	public function indexAction() {
		$categories = $this->getCategoryManager()->findAll();

		return $this->respondJson($categories);
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$category = $this->getCategoryManager()->findById($id);

		if ($category === null) {
			return $this->fail();
		} else {
			return $this->respondJson($category);
		}
	}

	/**
	 * @Route("/")
	 * @Method({"POST"})
	 */
	public function createAction(Request $request) {
		$category = new Category();
		$form = $this->createForm(new CategoryType(), $category);

		$form->submit($request->request->all());
		if ($form->isValid()) {
			$this->getCategoryManager()->save($category);
			return $this->respondJson($category, 200);
		} else {
			return $this->fail($form->getErrors());
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"PUT"})
	 */
	public function updateAction(Request $request, $id) {
		$category = $this->getCategoryManager()->findById($id);

		if ($category === null) {
			return $this->fail();
		} else {
			$form = $this->createForm(new CategoryType(), $category);

			$form->submit($request->request->all());
			if ($form->isValid()) {
				$this->getCategoryManager()->save($category);
				return $this->respondJson($category);
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
		$category = $this->getCategoryManager()->findById($id);

		if ($category === null) {
			return $this->fail();
		} else {
			$this->getCategoryManager()->delete($category);
			return $this->succeed();
		}
	}
}