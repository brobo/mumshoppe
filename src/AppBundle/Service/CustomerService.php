<?php
namespace AppBundle\Service;

class CustomerService extends EntityService {

	public function logIn($email, $password) {
		$customer = $this->repo->findOneByEmail($email);
		if ($customer === null) {
			return false;
		} else {
			return $customer->verifyPassword($password);
		}
	}

}