<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotoCatApiTest extends TestCase
{
	use MakePhotoCatTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePhotoCat()
	{
		$photoCat = $this->fakePhotoCatData();
		$this->json('POST', '/api/v1/photoCats', $photoCat);

		$this->assertApiResponse($photoCat);
	}

	/**
	 * @test
	 */
	public function testReadPhotoCat()
	{
		$photoCat = $this->makePhotoCat();
		$this->json('GET', '/api/v1/photoCats/' . $photoCat->id);

		$this->assertApiResponse($photoCat->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePhotoCat()
	{
		$photoCat = $this->makePhotoCat();
		$editedPhotoCat = $this->fakePhotoCatData();

		$this->json('PUT', '/api/v1/photoCats/' . $photoCat->id, $editedPhotoCat);

		$this->assertApiResponse($editedPhotoCat);
	}

	/**
	 * @test
	 */
	public function testDeletePhotoCat()
	{
		$photoCat = $this->makePhotoCat();
		$this->json('DELETE', '/api/v1/photoCats/' . $photoCat->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/photoCats/' . $photoCat->id);

		$this->assertResponseStatus(404);
	}
}
