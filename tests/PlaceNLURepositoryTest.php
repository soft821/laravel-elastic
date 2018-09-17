<?php

use App\Models\PlaceNLU;
use App\Repositories\PlaceNLURepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceNLURepositoryTest extends TestCase
{
	use MakePlaceNLUTrait, ApiTestTrait, DatabaseTransactions;

	/**
	 * @var PlaceNLURepository
	 */
	protected $placeNLURepo;

	public function setUp()
	{
		parent::setUp();
		$this->placeNLURepo = App::make(PlaceNLURepository::class);
	}

	/**
	 * @test create
	 */
	public function testCreatePlaceNLU()
	{
		$placeNLU = $this->fakePlaceNLUData();
		$createdPlaceNLU = $this->placeNLURepo->create($placeNLU);
		$createdPlaceNLU = $createdPlaceNLU->toArray();
		$this->assertArrayHasKey('id', $createdPlaceNLU);
		$this->assertNotNull($createdPlaceNLU['id'], 'Created PlaceNLU must have id specified');
		$this->assertNotNull(PlaceNLU::find($createdPlaceNLU['id']), 'PlaceNLU with given id must be in DB');
		$this->assertModelData($placeNLU, $createdPlaceNLU);
	}

	/**
	 * @test read
	 */
	public function testReadPlaceNLU()
	{
		$placeNLU = $this->makePlaceNLU();
		$dbPlaceNLU = $this->placeNLURepo->find($placeNLU->id);
		$dbPlaceNLU = $dbPlaceNLU->toArray();
		$this->assertModelData($placeNLU->toArray(), $dbPlaceNLU);
	}

	/**
	 * @test update
	 */
	public function testUpdatePlaceNLU()
	{
		$placeNLU = $this->makePlaceNLU();
		$fakePlaceNLU = $this->fakePlaceNLUData();
		$updatedPlaceNLU = $this->placeNLURepo->update($fakePlaceNLU, $placeNLU->id);
		$this->assertModelData($fakePlaceNLU, $updatedPlaceNLU->toArray());
		$dbPlaceNLU = $this->placeNLURepo->find($placeNLU->id);
		$this->assertModelData($fakePlaceNLU, $dbPlaceNLU->toArray());
	}

	/**
	 * @test delete
	 */
	public function testDeletePlaceNLU()
	{
		$placeNLU = $this->makePlaceNLU();
		$resp = $this->placeNLURepo->delete($placeNLU->id);
		$this->assertTrue($resp);
		$this->assertNull(PlaceNLU::find($placeNLU->id), 'PlaceNLU should not exist in DB');
	}
}
