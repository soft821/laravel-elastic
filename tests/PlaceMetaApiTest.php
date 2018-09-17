<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PlaceMetaApiTest extends TestCase
{
	use MakePlaceMetaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePlaceMeta()
	{
		$placeMeta = $this->fakePlaceMetaData();
		$this->json('POST', '/api/v1/placeMetas', $placeMeta);

		$this->assertApiResponse($placeMeta);
	}

	/**
	 * @test
	 */
	public function testReadPlaceMeta()
	{
		$placeMeta = $this->makePlaceMeta();
		$this->json('GET', '/api/v1/placeMetas/' . $placeMeta->id);

		$this->assertApiResponse($placeMeta->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePlaceMeta()
	{
		$placeMeta = $this->makePlaceMeta();
		$editedPlaceMeta = $this->fakePlaceMetaData();

		$this->json('PUT', '/api/v1/placeMetas/' . $placeMeta->id, $editedPlaceMeta);

		$this->assertApiResponse($editedPlaceMeta);
	}

	/**
	 * @test
	 */
	public function testDeletePlaceMeta()
	{
		$placeMeta = $this->makePlaceMeta();
		$this->json('DELETE', '/api/v1/placeMetas/' . $placeMeta->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/placeMetas/' . $placeMeta->id);

		$this->assertResponseStatus(404);
	}
}
