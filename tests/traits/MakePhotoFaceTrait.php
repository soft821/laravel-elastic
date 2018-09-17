<?php

use Faker\Factory as Faker;
use App\Models\PhotoFace;
use App\Repositories\PhotoFaceRepository;

trait MakePhotoFaceTrait
{
    /**
     * Create fake instance of PhotoFace and save it in database
     *
     * @param array $photoFaceFields
     * @return PhotoFace
     */
    public function makePhotoFace($photoFaceFields = [])
    {
        /** @var PhotoFaceRepository $photoFaceRepo */
        $photoFaceRepo = App::make(PhotoFaceRepository::class);
        $theme = $this->fakePhotoFaceData($photoFaceFields);
        return $photoFaceRepo->create($theme);
    }

    /**
     * Get fake instance of PhotoFace
     *
     * @param array $photoFaceFields
     * @return PhotoFace
     */
    public function fakePhotoFace($photoFaceFields = [])
    {
        return new PhotoFace($this->fakePhotoFaceData($photoFaceFields));
    }

    /**
     * Get fake data of PhotoFace
     *
     * @param array $postFields
     * @return array
     */
    public function fakePhotoFaceData($photoFaceFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'photo_id' => $fake->randomDigitNotNull,
            'face_recognized' => $fake->word,
            'data' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s')
        ], $photoFaceFields);
    }
}
