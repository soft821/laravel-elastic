<?php

use App\Models\PlaceMetaData;
use App\Repositories\PlaceMetaDataRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceMetaDataRepositoryTest extends TestCase
{
	use MakePlaceMetaDataTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceMetaDataRepository
	 */
	protected $placeMetaDataRepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeMetaDataRepo = App::make(PlaceMetaDataRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceMetaData()
	{
		$placeMetaData = $this->fakePlaceMetaDataData();
		$createdPlaceMetaData = $this->placeMetaDataRepo->create($placeMetaData);
		$createdPlaceMetaData = $createdPlaceMetaData->toArray();
		$this->assertArrayHasKey('id', $createdPlaceMetaData);
		$this->assertNotNull($createdPlaceMetaData['id'], 'Created PlaceMetaData must have id specified');
		$this->assertNotNull(PlaceMetaData::find($createdPlaceMetaData['id']), 'PlaceMetaData with given id must be in DB');
		$this->assertModelData($placeMetaData, $createdPlaceMetaData);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceMetaData()
	{
		$placeMetaData = $this->makePlaceMetaData();
		$dbPlaceMetaData = $this->placeMetaDataRepo->find($placeMetaData->id);
		$dbPlaceMetaData = $dbPlaceMetaData->toArray();
		$this->assertModelData($placeMetaData->toArray(), $dbPlaceMetaData);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceMetaData()
	{
		$placeMetaData = $this->makePlaceMetaData();
		$fakePlaceMetaData = $this->fakePlaceMetaDataData();
		$updatedPlaceMetaData = $this->placeMetaDataRepo->update($fakePlaceMetaData, $placeMetaData->id);
		$this->assertModelData($fakePlaceMetaData, $updatedPlaceMetaData->toArray());
		$dbPlaceMetaData = $this->placeMetaDataRepo->find($placeMetaData->id);
		$this->assertModelData($fakePlaceMetaData, $dbPlaceMetaData->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceMetaData()
	{
		$placeMetaData = $this->makePlaceMetaData();
		$resp = $this->placeMetaDataRepo->delete($placeMetaData->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceMetaData::find($placeMetaData->id), 'PlaceMetaData should not exist in DB');
	}
}
