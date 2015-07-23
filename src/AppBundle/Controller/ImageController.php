<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Group;
use AppBundle\Form\GroupType;

use AppBundle\Entity\Image;
use AppBundle\Form\ImageType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

abstract class ImageController extends EntityController {

	public function getImageManager() {
		return $this->get('image_manager');
	}

	/**
	 * @Route("/{id}/image")
	 * @Method({"GET"})
	 * @var int $id Represents the id of the entity this image belongs to
	 */
	public function getImageAction($id) {
		$entity = $this->getEntityManager()->findById($id);
		if ($entity === null || $entity->getImage() == null) {
			return $this->fail();
		} else {
			return $this->respondFile($entity->getImage()->getAbsolutePath());
		}
	}

	/**
	 * @Route("/{id}/image")
	 * @Method({"POST"})
	 * @var int $id Represents the id of the entity this image belongs to
	 */
	public function setImageAction($id, Request $request) {
		$entity = $this->getEntityManager()->findById($id);
		if ($entity === null) {
			return $this->fail();
		} else {
		$image = new Image();
			$image->setFile($request->files->get('file'));

			if ($request->files->get('file') != null) {
				$image->setFile($request->files->get('file'));
				$entity->setImage($image);
				$this->getImageManager()->save($image);
				$this->getEntityManager()->save($entity);
				return $this->succeed();
			} else {
				return $this->fail();
			}
		}
	}

}