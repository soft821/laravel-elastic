<?php

use Faker\Factory as Faker;
use App\Models\PhotoCat;
use App\Repositories\PhotoCatRepository;

trait MakePhotoCatTrait
{
	/**
	 * Create fake instance of PhotoCat and save it in database
	 *
	 * @param array $photoCatFields
	 * @return PhotoCat
	 */
	public function makePhotoCat($photoCatFields = [])
	{
		/** @var PhotoCatRepository $photoCatRepo */
		$photoCatRepo = App::make(PhotoCatRepository::class);
		$theme = $this->fakePhotoCatData($photoCatFields);
		return $photoCatRepo->create($theme);
	}

	/**
	 * Get fake instance of PhotoCat
	 *
	 * @param array $photoCatFields
	 * @return PhotoCat
	 */
	public function fakePhotoCat($photoCatFields = [])
	{
		return new PhotoCat($this->fakePhotoCatData($photoCatFields));
	}

	/**
	 * Get fake data of PhotoCat
	 *
	 * @param array $postFields
	 * @return array
	 */
	public function fakePhotoCatData($photoCatFields = [])
	{
		$fake = Faker::create();

		return array_merge([
			'photo_id' => $fake->randomDigitNotNull,
			'label' => $fake->word,
			'confidence' => $fake->randomDigitNotNull,
			'cat_0' => $fake->word,
			'cat_1' => $fake->word,
			'cat_2' => $fake->word,
			'cat_3' => $fake->word,
			'cat_4' => $fake->word,
			'cat_5' => $fake->word,
			'cat_6' => $fake->word,
			'cat_7' => $fake->word
		], $photoCatFields);
	}
}
