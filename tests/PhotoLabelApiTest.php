<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotoLabelApiTest extends TestCase
{
	use MakePhotoLabelTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

	/**
	 * @test
	 */
	public function testCreatePhotoLabel()
	{
		$photoLabel = $this->fakePhotoLabelData();
		$this->json('POST', '/api/v1/photoLabels', $photoLabel);

		$this->assertApiResponse($photoLabel);
	}

	/**
	 * @test
	 */
	public function testReadPhotoLabel()
	{
		$photoLabel = $this->makePhotoLabel();
		$this->json('GET', '/api/v1/photoLabels/' . $photoLabel->id);

		$this->assertApiResponse($photoLabel->toArray());
	}

	/**
	 * @test
	 */
	public function testUpdatePhotoLabel()
	{
		$photoLabel = $this->makePhotoLabel();
		$editedPhotoLabel = $this->fakePhotoLabelData();

		$this->json('PUT', '/api/v1/photoLabels/' . $photoLabel->id, $editedPhotoLabel);

		$this->assertApiResponse($editedPhotoLabel);
	}

	/**
	 * @test
	 */
	public function testDeletePhotoLabel()
	{
		$photoLabel = $this->makePhotoLabel();
		$this->json('DELETE', '/api/v1/photoLabels/' . $photoLabel->id);

		$this->assertApiSuccess();
		$this->json('GET', '/api/v1/photoLabels/' . $photoLabel->id);

		$this->assertResponseStatus(404);
	}
}
