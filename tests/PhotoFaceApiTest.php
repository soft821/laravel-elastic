<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PhotoFaceApiTest extends TestCase
{
    use MakePhotoFaceTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePhotoFace()
    {
        $photoFace = $this->fakePhotoFaceData();
        $this->json('POST', '/api/v1/photoFaces', $photoFace);

        $this->assertApiResponse($photoFace);
    }

    /**
     * @test
     */
    public function testReadPhotoFace()
    {
        $photoFace = $this->makePhotoFace();
        $this->json('GET', '/api/v1/photoFaces/'.$photoFace->id);

        $this->assertApiResponse($photoFace->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePhotoFace()
    {
        $photoFace = $this->makePhotoFace();
        $editedPhotoFace = $this->fakePhotoFaceData();

        $this->json('PUT', '/api/v1/photoFaces/'.$photoFace->id, $editedPhotoFace);

        $this->assertApiResponse($editedPhotoFace);
    }

    /**
     * @test
     */
    public function testDeletePhotoFace()
    {
        $photoFace = $this->makePhotoFace();
        $this->json('DELETE', '/api/v1/photoFaces/'.$photoFace->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/photoFaces/'.$photoFace->id);

        $this->assertResponseStatus(404);
    }
}
