<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="backings")
 */
class Backing {

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @var int
	 */
	protected $id;

	/**
	 * @ORM\Column(type="string", length=100)
	 * @Assert\NotBlank()
	 */
	protected $name;

	/**
	 * @ORM\Column(type="decimal", scale=2)
	 * @Assert\GreaterThanOrEqual(value=0)
	 * @Assert\NotBlank()
	 */
	protected $price;

	/**
	 * @ORM\ManyToOne(targetEntity="Product", inversedBy="backings")
	 * @ORM\JoinColumn(name="product_id", referencedColumnName="id")
	 */
	protected $product;

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="id")
     */
    protected $group;

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
     * Set name
     *
     * @param string $name
     * @return Backing
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set price
     *
     * @param string $price
     * @return Backing
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return string 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set backing
     *
     * @param \AppBundle\Entity\Product $backing
     * @return Backing
     */
    public function setBacking(\AppBundle\Entity\Product $backing = null)
    {
        $this->backing = $backing;

        return $this;
    }

    /**
     * Get backing
     *
     * @return \AppBundle\Entity\Product 
     */
    public function getBacking()
    {
        return $this->backing;
    }

    /**
     * Set product
     *
     * @param \AppBundle\Entity\Product $product
     * @return Backing
     */
    public function setProduct(\AppBundle\Entity\Product $product = null)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * Get product
     *
     * @return \AppBundle\Entity\Product 
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set group
     *
     * @param \AppBundle\Entity\Group $group
     * @return Backing
     */
    public function setGroup(\AppBundle\Entity\Group $group = null)
    {
        $this->group = $group;

        return $this;
    }

    /**
     * Get group
     *
     * @return \AppBundle\Entity\Group 
     */
    public function getGroup()
    {
        return $this->group;
    }
}
