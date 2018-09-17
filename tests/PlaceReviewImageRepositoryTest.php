<?php

use App\Models\PlaceReviewImage;
use App\Repositories\PlaceReviewImageRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceReviewImageRepositoryTest extends TestCase
{
	use MakePlaceReviewImageTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceReviewImageRepository
	 */
	protected $placeReviewImageRepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeReviewImageRepo = App::make(PlaceReviewImageRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceReviewImage()
	{
		$placeReviewImage = $this->fakePlaceReviewImageData();
		$createdPlaceReviewImage = $this->placeReviewImageRepo->create($placeReviewImage);
		$createdPlaceReviewImage = $createdPlaceReviewImage->toArray();
		$this->assertArrayHasKey('id', $createdPlaceReviewImage);
		$this->assertNotNull($createdPlaceReviewImage['id'], 'Created PlaceReviewImage must have id specified');
		$this->assertNotNull(PlaceReviewImage::find($createdPlaceReviewImage['id']), 'PlaceReviewImage with given id must be in DB');
		$this->assertModelData($placeReviewImage, $createdPlaceReviewImage);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceReviewImage()
	{
		$placeReviewImage = $this->makePlaceReviewImage();
		$dbPlaceReviewImage = $this->placeReviewImageRepo->find($placeReviewImage->id);
		$dbPlaceReviewImage = $dbPlaceReviewImage->toArray();
		$this->assertModelData($placeReviewImage->toArray(), $dbPlaceReviewImage);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceReviewImage()
	{
		$placeReviewImage = $this->makePlaceReviewImage();
		$fakePlaceReviewImage = $this->fakePlaceReviewImageData();
		$updatedPlaceReviewImage = $this->placeReviewImageRepo->update($fakePlaceReviewImage, $placeReviewImage->id);
		$this->assertModelData($fakePlaceReviewImage, $updatedPlaceReviewImage->toArray());
		$dbPlaceReviewImage = $this->placeReviewImageRepo->find($placeReviewImage->id);
		$this->assertModelData($fakePlaceReviewImage, $dbPlaceReviewImage->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceReviewImage()
	{
		$placeReviewImage = $this->makePlaceReviewImage();
		$resp = $this->placeReviewImageRepo->delete($placeReviewImage->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceReviewImage::find($placeReviewImage->id), 'PlaceReviewImage should not exist in DB');
	}
}
