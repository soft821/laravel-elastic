<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotosApiTest extends TestCase
{
    use MakePhotosTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePhotos()
    {
        $photos = $this->fakePhotosData();
        $this->json('POST', '/api/v1/photos', $photos);

        $this->assertApiResponse($photos);
    }

    /**
     * @test
     */
    public function testReadPhotos()
    {
        $photos = $this->makePhotos();
        $this->json('GET', '/api/v1/photos/'.$photos->id);

        $this->assertApiResponse($photos->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePhotos()
    {
        $photos = $this->makePhotos();
        $editedPhotos = $this->fakePhotosData();

        $this->json('PUT', '/api/v1/photos/'.$photos->id, $editedPhotos);

        $this->assertApiResponse($editedPhotos);
    }

    /**
     * @test
     */
    public function testDeletePhotos()
    {
        $photos = $this->makePhotos();
        $this->json('DELETE', '/api/v1/photos/'.$photos->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/photos/'.$photos->id);

        $this->assertResponseStatus(404);
    }
}
