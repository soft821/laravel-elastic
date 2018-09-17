<?php

use Faker\Factory as Faker;
use App\Models\PhotoLabel;
use App\Repositories\PhotoLabelRepository;

trait MakePhotoLabelTrait
{
	/**
	 * Create fake instance of PhotoLabel and save it in database
	 *
	 * @param array $photoLabelFields
	 * @return PhotoLabel
	 */
	public function makePhotoLabel($photoLabelFields = [])
	{
		/** @var PhotoLabelRepository $photoLabelRepo */
		$photoLabelRepo = App::make(PhotoLabelRepository::class);
		$theme = $this->fakePhotoLabelData($photoLabelFields);
		return $photoLabelRepo->create($theme);
	}

	/**
	 * Get fake instance of PhotoLabel
	 *
	 * @param array $photoLabelFields
	 * @return PhotoLabel
	 */
	public function fakePhotoLabel($photoLabelFields = [])
	{
		return new PhotoLabel($this->fakePhotoLabelData($photoLabelFields));
	}

	/**
	 * Get fake data of PhotoLabel
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePhotoLabelData($photoLabelFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'photo_id' => $fake->randomDigitNotNull,
			'label' => $fake->word,
			'src' => $fake->word,
			'confidence' => $fake->randomDigitNotNull,
			'cat_2' => $fake->word,
			'cat_3' => $fake->word,
			'cat_4' => $fake->word,
			'cat_5' => $fake->word,
			'cat_6' => $fake->word,
			'cat_7' => $fake->word,
			'created_at' => $fake->date('Y-m-d H:i:s'),
			'updated_at' => $fake->date('Y-m-d H:i:s')
		], $photoLabelFields);
	}
}
