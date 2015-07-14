<?php
namespace AppBundle\Service;

class CustomerService extends EntityService {

	public function logIn($id, $password) {
		$customer = $this->findById($id);
		if ($customer === null) {
			return false;
		} else {
			return $customer->verifyPassword($password);
		}
	}

}