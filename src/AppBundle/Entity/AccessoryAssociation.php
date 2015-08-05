<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/** 
 * @ORM\Entity
 * @ORM\Table(name="accessory_associations")
 */
class AccessoryAssociation {

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 */
	protected $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Mum")
	 * @ORM\JoinColumn(name="mum_id", referencedColumnName="id")
	 */
	protected $mum;

	/**
	 * @ORM\ManyToOne(targetEntity="Accessory")
	 * @ORM\JoinColumn(name="accessory_id", referencedColumnName="id")
	 */
	protected $accessory;

	/**
	 * @ORM\Column(type="integer")
	 */
	protected $quantity;


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
     * Set quantity
     *
     * @param integer $quantity
     * @return AccessoryAssociation
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity
     *
     * @return integer 
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set mum
     *
     * @param \AppBundle\Entity\Mum $mum
     * @return AccessoryAssociation
     */
    public function setMum(\AppBundle\Entity\Mum $mum = null)
    {
        $this->mum = $mum;

        return $this;
    }

    /**
     * Get mum
     *
     * @return \AppBundle\Entity\Mum 
     */
    public function getMum()
    {
        return $this->mum;
    }

    /**
     * Set accessory
     *
     * @param \AppBundle\Entity\Accessory $accessory
     * @return AccessoryAssociation
     */
    public function setAccessory(\AppBundle\Entity\Accessory $accessory = null)
    {
        $this->accessory = $accessory;

        return $this;
    }

    /**
     * Get accessory
     *
     * @return \AppBundle\Entity\Accessory 
     */
    public function getAccessory()
    {
        return $this->accessory;
    }
}
