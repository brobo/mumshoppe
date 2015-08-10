<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Exclude;

/**
 * @ORM\Entity
 * @ORM\Table(name="customers")
 */
class Customer {

    public function __construct() {
        $this->orders = new ArrayCollection();
    }

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 */
	protected $id;

	/**
	 * @ORM\Column(type="string", length=100)
	 * @Assert\NotBlank()
	 * @Assert\Email(message="The address '{{ value }}' is not valid.")
	 */
	protected $email;

	/**
	 * @ORM\Column(type="string", length=64)
	 */
	protected $password;

	/**
	 * @ORM\Column(type="string", length=32)
	 * @Assert\NotBlank()
	 * @Assert\Regex(pattern="/[a-zA-Z ]+/", message="{{ value }} is not a valid last name.")
     * @SerializedName("firstName")
	 */
	protected $firstName;

	/**
	 * @ORM\Column(type="string", length=32)
	 * @Assert\NotBlank()
	 * @Assert\Regex(pattern="/[a-zA-Z ]+/", message="{{ value }} is not a valid last name.")
     * @SerializedName("lastName")
	 */
	protected $lastName;

	/**
	 * @ORM\Column(type="string", length=16)
	 * @Assert\Regex(pattern="/[0-9-]+/", message="The phone number '{{ value }}' is not valid.")
	 */
	protected $phone;

    /**
     * @ORM\OneToOne(targetEntity="Token")
     * @ORM\JoinColumn(name="token_id", referencedColumnName="id")
     * @Exclude
     */
    protected $token;

    /**
     * @ORM\OneToMany(targetEntity="Order", mappedBy="customer")
     */
    protected $orders;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return Customer
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return Customer
     */
    public function setPassword($password)
    {
        $this->password = password_hash($password, PASSWORD_BCRYPT);

        return $this;
    }

    /**
     * Verify password
     *
     * @param string $password
     * @return boolean
     */
    public function verifyPassword($password) {
    	return password_verify($password, $this->password);
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     * @return Customer
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     * @return Customer
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Customer
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set token
     *
     * @param \AppBundle\Entity\Token $token
     * @return Customer
     */
    public function setToken(\AppBundle\Entity\Token $token = null)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get token
     *
     * @return \AppBundle\Entity\Token 
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Add orders
     *
     * @param \AppBundle\Entity\Order $orders
     * @return Customer
     */
    public function addOrder(\AppBundle\Entity\Order $orders)
    {
        $this->orders[] = $orders;

        return $this;
    }

    /**
     * Remove orders
     *
     * @param \AppBundle\Entity\Order $orders
     */
    public function removeOrder(\AppBundle\Entity\Order $orders)
    {
        $this->orders->removeElement($orders);
    }

    /**
     * Get orders
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getOrders()
    {
        return $this->orders;
    }
}
