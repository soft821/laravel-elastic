<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceMetaDataApiTest extends TestCase
{
	use MakePlaceMetaDataTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceMetaData()
	{
		$placeMetaData = $this->fakePlaceMetaDataData();
		$this->json('POST', '/api/v1/placeMetaDatas', $placeMetaData);

		$this->assertApiResponse($placeMetaData);
	}

	/**
	 * @test
	 */
	public function testReadPlaceMetaData()
	{
		$placeMetaData = $this->makePlaceMetaData();
		$this->json('GET', '/api/v1/placeMetaDatas/' . $placeMetaData->id);

		$this->assertApiResponse($placeMetaData->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceMetaData()
	{
		$placeMetaData = $this->makePlaceMetaData();
		$editedPlaceMetaData = $this->fakePlaceMetaDataData();

		$this->json('PUT', '/api/v1/placeMetaDatas/' . $placeMetaData->id, $editedPlaceMetaData);

		$this->assertApiResponse($editedPlaceMetaData);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceMetaData()
	{
		$placeMetaData = $this->makePlaceMetaData();
		$this->json('DELETE', '/api/v1/placeMetaDatas/' . $placeMetaData->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeMetaDatas/' . $placeMetaData->id);

		$this->assertResponseStatus(404);
	}
}
