<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use JMS\Serializer\Annotation\Exclude;

abstract class VisualEntity {

	/**
	 * @ORM\OneToOne(targetEntity="Image")
	 * @ORM\JoinColumn(name="image_id", referencedColumnName="id")
     * @Exclude
	 */
	protected $image;

    /**
     * Set image
     *
     * @param \AppBundle\Entity\Image $image
     * @return VisualEntity
     */
    public function setImage(\AppBundle\Entity\Image $image = null)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return \AppBundle\Entity\Image 
     */
    public function getImage()
    {
        return $this->image;
    }
}
