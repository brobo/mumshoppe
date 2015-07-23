<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Product;
use AppBundle\Form\ProductType;

use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/api/product")
 */
class ProductController extends EntityController {

	public function getProductManager() {
		return $this->get('product_manager');
	}

	public function getEntityManager() {
		return $this->getProductManager();
	}

	public function __construct() {
		parent::__construct('Product', 'ProductType');
	}

	// /**
	//  * @Route("/")
	//  * @Method({"GET"})
	//  */
	// public function indexAction() {
	// 	$products = $this->getProductManager()->findAll();

	// 	return $this->respondJson($products);
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"GET"})
	//  */
	// public function showAction($id) {
	// 	$product = $this->getProductManager()->findById($id);

	// 	if ($product === null) {
	// 		return $this->fail();
	// 	} else {
	// 		return $this->respondJson($product);
	// 	}
	// }

	// /**
	//  * @Route("/")
	//  * @Method({"POST"})
	//  */
	// public function postAction(Request $request) {
	// 	$product = new Product();
	// 	$form = $this->createForm(new ProductType(), $product);

	// 	$form->submit($request->request->all());
	// 	if ($form->isValid()) {
	// 		$this->getProductManager()->save($product);
	// 		return $this->respondJson($product, 200);
	// 	} else {
	// 		return $this->fail($form->getErrors());
	// 	}
	// }

	// /**
	//  * @Route("/{id}")
	//  * @Method({"PUT"})
	//  */
	// public function putAction(Request $request, $id) {
	// 	$product = $this->getProductManager()->findById($id);

	// 	if ($product === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$form = $this->createForm(new ProductType(), $product);

	// 		$form->submit($request->request->all());
	// 		if ($form->isValid()) {
	// 			$this->getProductManager()->save($product);
	// 			return $this->respondJson($product, 200);
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
	// 	$product = $this->getProductManager()->findById($id);

	// 	if ($product === null) {
	// 		return $this->fail();
	// 	} else {
	// 		$this->getProductManager()->delete($product);
	// 		return $this->succeed();
	// 	}
	// }

}