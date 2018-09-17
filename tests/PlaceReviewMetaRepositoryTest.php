<?php

use App\Models\PlaceReviewMeta;
use App\Repositories\PlaceReviewMetaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceReviewMetaRepositoryTest extends TestCase
{
	use MakePlaceReviewMetaTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceReviewMetaRepository
	 */
	protected $placeReviewMetaRepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeReviewMetaRepo = App::make(PlaceReviewMetaRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceReviewMeta()
	{
		$placeReviewMeta = $this->fakePlaceReviewMetaData();
		$createdPlaceReviewMeta = $this->placeReviewMetaRepo->create($placeReviewMeta);
		$createdPlaceReviewMeta = $createdPlaceReviewMeta->toArray();
		$this->assertArrayHasKey('id', $createdPlaceReviewMeta);
		$this->assertNotNull($createdPlaceReviewMeta['id'], 'Created PlaceReviewMeta must have id specified');
		$this->assertNotNull(PlaceReviewMeta::find($createdPlaceReviewMeta['id']), 'PlaceReviewMeta with given id must be in DB');
		$this->assertModelData($placeReviewMeta, $createdPlaceReviewMeta);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceReviewMeta()
	{
		$placeReviewMeta = $this->makePlaceReviewMeta();
		$dbPlaceReviewMeta = $this->placeReviewMetaRepo->find($placeReviewMeta->id);
		$dbPlaceReviewMeta = $dbPlaceReviewMeta->toArray();
		$this->assertModelData($placeReviewMeta->toArray(), $dbPlaceReviewMeta);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceReviewMeta()
	{
		$placeReviewMeta = $this->makePlaceReviewMeta();
		$fakePlaceReviewMeta = $this->fakePlaceReviewMetaData();
		$updatedPlaceReviewMeta = $this->placeReviewMetaRepo->update($fakePlaceReviewMeta, $placeReviewMeta->id);
		$this->assertModelData($fakePlaceReviewMeta, $updatedPlaceReviewMeta->toArray());
		$dbPlaceReviewMeta = $this->placeReviewMetaRepo->find($placeReviewMeta->id);
		$this->assertModelData($fakePlaceReviewMeta, $dbPlaceReviewMeta->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceReviewMeta()
	{
		$placeReviewMeta = $this->makePlaceReviewMeta();
		$resp = $this->placeReviewMetaRepo->delete($placeReviewMeta->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceReviewMeta::find($placeReviewMeta->id), 'PlaceReviewMeta should not exist in DB');
	}
}
