<?php

use App\Models\PlaceImage;
use App\Repositories\PlaceImageRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceImageRepositoryTest extends TestCase
{
	use MakePlaceImageTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceImageRepository
	 */
	protected $placeImageRepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeImageRepo = App::make(PlaceImageRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceImage()
	{
		$placeImage = $this->fakePlaceImageData();
		$createdPlaceImage = $this->placeImageRepo->create($placeImage);
		$createdPlaceImage = $createdPlaceImage->toArray();
		$this->assertArrayHasKey('id', $createdPlaceImage);
		$this->assertNotNull($createdPlaceImage['id'], 'Created PlaceImage must have id specified');
		$this->assertNotNull(PlaceImage::find($createdPlaceImage['id']), 'PlaceImage with given id must be in DB');
		$this->assertModelData($placeImage, $createdPlaceImage);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceImage()
	{
		$placeImage = $this->makePlaceImage();
		$dbPlaceImage = $this->placeImageRepo->find($placeImage->id);
		$dbPlaceImage = $dbPlaceImage->toArray();
		$this->assertModelData($placeImage->toArray(), $dbPlaceImage);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceImage()
	{
		$placeImage = $this->makePlaceImage();
		$fakePlaceImage = $this->fakePlaceImageData();
		$updatedPlaceImage = $this->placeImageRepo->update($fakePlaceImage, $placeImage->id);
		$this->assertModelData($fakePlaceImage, $updatedPlaceImage->toArray());
		$dbPlaceImage = $this->placeImageRepo->find($placeImage->id);
		$this->assertModelData($fakePlaceImage, $dbPlaceImage->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceImage()
	{
		$placeImage = $this->makePlaceImage();
		$resp = $this->placeImageRepo->delete($placeImage->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceImage::find($placeImage->id), 'PlaceImage should not exist in DB');
	}
}
