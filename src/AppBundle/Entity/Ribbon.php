<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="ribbons")
*/
class Ribbon {

	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 */
	protected $id;

	/**
	 * @ORM\Column(type="string", length=12)
	 */
	protected $content;

	/**
	 * @ORM\ManyToOne(targetEntity="Letter")
	 * @ORM\JoinColumn(name="letter_id", referencedColumnName="id")
	 */
	protected $letter;

    /**
     * @ORM\ManyToOne(targetEntity="Mum", inversedBy="ribbons")
     * @ORM\JoinColumn(name="mum_id", referencedColumnName="id")
     */
    protected $mum;


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
     * Set content
     *
     * @param string $content
     * @return Ribbon
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string 
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set letter
     *
     * @param \AppBundle\Entity\Letter $letter
     * @return Ribbon
     */
    public function setLetter(\AppBundle\Entity\Letter $letter = null)
    {
        $this->letter = $letter;

        return $this;
    }

    /**
     * Get letter
     *
     * @return \AppBundle\Entity\Letter 
     */
    public function getLetter()
    {
        return $this->letter;
    }
    /**
     * @var \AppBundle\Entity\Image
     */
    private $image;


    /**
     * Set mum
     *
     * @param \AppBundle\Entity\Mum $mum
     * @return Ribbon
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

}
