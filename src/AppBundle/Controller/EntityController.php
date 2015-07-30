<?php
namespace AppBundle\Controller;

use ReflectionClass;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

abstract class EntityController extends RestController {

	protected abstract function getEntityManager();
	private $entityClass;
	private $formClass;
	
	public function __construct($entityClass, $formClass) {
		$this->entityClass = new ReflectionClass("AppBundle\\Entity\\$entityClass");
		$this->formClass = new ReflectionClass("AppBundle\\Form\\$formClass");
	}

	private function getForm($entity = null) {
		if ($entity === null) {
			$entity = $this->entityClass->newInstance();
		}

		return parent::createForm($this->formClass->newInstance(), $entity);
	}

	/**
	 * @Route("/")
	 * @Method({"GET"})
	 */
	public function indexAction() {
		$entities = $this->getEntityManager()->findAll();

		return $this->respondJson($entities);
	}

	/**
	 * @Route("/{id}")
	 * @Method({"GET"})
	 */
	public function showAction($id) {
		$entity = $this->getEntityManager()->findById($id);

		if ($entity === null) {
			return $this->fail();
		} else {
			return $this->respondJson($entity);
		}
	}

	/**
	 * @Route("/")
	 * @Method({"POST"})
	 */
	public function postAction(Request $request) {
		$entity = $this->entityClass->newInstance();
		$form = $this->getForm($entity);

		$form->submit($request->request->all());

		if ($form->isValid()) {
			$this->getEntityManager()->save($entity);
			return $this->respondJson($entity, 200);
		} else {
			return $this->fail($form->getErrors());
		}
	}

	/**
	 * @Route("/{id}")
	 * @Method({"PUT"})
	 */
	public function putAction(Request $request, $id) {
		$entity = $this->getEntityManager()->findById($id);

		if ($entity === null) {
			return $this->fail();
		} else {
			$form = $this->getForm($entity);

			$form->submit($request->request->all());

			if ($form->isValid()) {
				$this->getEntityManager()->save($entity);
				return $this->respondJson($entity, 200);
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
		$entity = $this->getEntityManager()->findById($id);

		if ($entity === null) {
			return $this->fail();
		} else {
			$this->getEntityManager()->delete($entity);
			return $this->succeed();
		}
	}

}