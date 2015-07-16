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
	 */
	public function getImageAction($id) {
		
	}

	/**
	 * @Route("/{id}/image")
	 * @Method({"POST"})
	 */
	public function setImageAction($id, Request $request) {
		$image = new Image();
		$image->setFile($request->files->get('file'));

		if ($request->files->get('file') != null) {
			$image->setFile($request->files->get('file'));
			$this->getImageManager()->save($image);
			return $this->succeed();
		} else {
			return $this->fail();
		}
	}

}