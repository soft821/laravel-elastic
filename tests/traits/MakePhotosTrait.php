<?php

use Faker\Factory as Faker;
use App\Models\Photos;
use App\Repositories\PhotosRepository;

trait MakePhotosTrait
{
    /**
     * Create fake instance of Photos and save it in database
     *
     * @param array $photosFields
     * @return Photos
     */
    public function makePhotos($photosFields = [])
    {
        /** @var PhotosRepository $photosRepo */
        $photosRepo = App::make(PhotosRepository::class);
        $theme = $this->fakePhotosData($photosFields);
        return $photosRepo->create($theme);
    }

    /**
     * Get fake instance of Photos
     *
     * @param array $photosFields
     * @return Photos
     */
    public function fakePhotos($photosFields = [])
    {
        return new Photos($this->fakePhotosData($photosFields));
    }

    /**
     * Get fake data of Photos
     *
     * @param array $postFields
     * @return array
     */
    public function fakePhotosData($photosFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'path' => $fake->word,
            'src' => $fake->word,
            'link' => $fake->word,
            'aws_indexing' => $fake->word,
            'aws_done' => $fake->word,
            'src_done' => $fake->word,
            'watson_done' => $fake->word,
            'valid' => $fake->word,
            'watson_cats_done' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s')
        ], $photosFields);
    }
}
