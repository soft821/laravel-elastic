<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceNLUApiTest extends TestCase
{
	use MakePlaceNLUTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceNLU()
	{
		$placeNLU = $this->fakePlaceNLUData();
		$this->json('POST', '/api/v1/placeNLUs', $placeNLU);

		$this->assertApiResponse($placeNLU);
	}

	/**
	 * @test
	 */
	public function testReadPlaceNLU()
	{
		$placeNLU = $this->makePlaceNLU();
		$this->json('GET', '/api/v1/placeNLUs/' . $placeNLU->id);

		$this->assertApiResponse($placeNLU->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceNLU()
	{
		$placeNLU = $this->makePlaceNLU();
		$editedPlaceNLU = $this->fakePlaceNLUData();

		$this->json('PUT', '/api/v1/placeNLUs/' . $placeNLU->id, $editedPlaceNLU);

		$this->assertApiResponse($editedPlaceNLU);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceNLU()
	{
		$placeNLU = $this->makePlaceNLU();
		$this->json('DELETE', '/api/v1/placeNLUs/' . $placeNLU->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeNLUs/' . $placeNLU->id);

		$this->assertResponseStatus(404);
	}
}
