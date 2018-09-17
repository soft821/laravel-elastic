<?php

use App\Models\PlaceMeta;
use App\Repositories\PlaceMetaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceMetaRepositoryTest extends TestCase
{
	use MakePlaceMetaTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceMetaRepository
	 */
	protected $placeMetaRepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeMetaRepo = App::make(PlaceMetaRepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceMeta()
	{
		$placeMeta = $this->fakePlaceMetaData();
		$createdPlaceMeta = $this->placeMetaRepo->create($placeMeta);
		$createdPlaceMeta = $createdPlaceMeta->toArray();
		$this->assertArrayHasKey('id', $createdPlaceMeta);
		$this->assertNotNull($createdPlaceMeta['id'], 'Created PlaceMeta must have id specified');
		$this->assertNotNull(PlaceMeta::find($createdPlaceMeta['id']), 'PlaceMeta with given id must be in DB');
		$this->assertModelData($placeMeta, $createdPlaceMeta);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceMeta()
	{
		$placeMeta = $this->makePlaceMeta();
		$dbPlaceMeta = $this->placeMetaRepo->find($placeMeta->id);
		$dbPlaceMeta = $dbPlaceMeta->toArray();
		$this->assertModelData($placeMeta->toArray(), $dbPlaceMeta);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceMeta()
	{
		$placeMeta = $this->makePlaceMeta();
		$fakePlaceMeta = $this->fakePlaceMetaData();
		$updatedPlaceMeta = $this->placeMetaRepo->update($fakePlaceMeta, $placeMeta->id);
		$this->assertModelData($fakePlaceMeta, $updatedPlaceMeta->toArray());
		$dbPlaceMeta = $this->placeMetaRepo->find($placeMeta->id);
		$this->assertModelData($fakePlaceMeta, $dbPlaceMeta->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceMeta()
	{
		$placeMeta = $this->makePlaceMeta();
		$resp = $this->placeMetaRepo->delete($placeMeta->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceMeta::find($placeMeta->id), 'PlaceMeta should not exist in DB');
	}
}
