<?php
namespace AppBundle\Service;

use Doctrine\ORM\EntityManager;

class EntityService {

	protected $em;
	protected $repo;

	public function __construct(EntityManager $em) {
		$this->em = $em;
	}

	public function setRepo($repoType) {
		$this->repo = $this->em->getRepository("AppBundle:" . $repoType);
	}

	public function findAll() {
		return $this->repo->findAll();
	}

	public function findById($id) {
		return $this->repo->findOneById($id);
	}

	// Used for both creating and updating.
	public function save($entity) {
		$this->em->persist($entity);
		$this->em->flush();
	}

	public function delete($entity) {
		$this->em->remove($entity);
		$this->em->flush();
	}

}