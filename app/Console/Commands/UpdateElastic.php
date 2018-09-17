<?php

namespace App\Console\Commands;

use App\Models\Photos;
use App\Models\Place;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use GuzzleHttp;
use Illuminate\Console\Command;
use InvalidArgumentException;

class UpdateElastic extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'update-elasticsearch {--type=} {--since=} {--refresh=}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Updates records in Elasticsearch.';

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
		switch ($this->option('type')) {
			case 'photos':
				$this->updatePhotos();
				break;
			case 'places':
				$this->updatePlaces();
				break;

			case null:
				$this->updatePlaces();
				$this->updatePhotos();


				break;
			default:
				throw new InvalidArgumentException('Unrecognised type');
		}
	}

	private function updatePhotos()
	{
		$count = Photos::count();
		$bar = $this->output->createProgressBar($count);
		$bar->setFormat('Updating Photos %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%/%estimated:-6s% %memory:6s%');
		//$bar->setRedrawFrequency(1000);

		Photos::with(['categories', 'faces', 'labels'])->chunk(2000, function ($data) use ($bar) {
			$data->addToIndex();
			$bar->advance(2000);
		});
		$bar->finish();
		echo PHP_EOL;
	}



	private function updatePlaces()
	{

		$count = Place::count();

		Place::putMapping();


		$bar = $this->output->createProgressBar($count);
		$bar->setFormat(' %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%/%estimated:-6s% %memory:6s%');
		//$bar->setMaxSteps(1000);


		Place::with(['meta', 'meta_data', 'image', 'nlu', 'review'])->chunk(2000, function ($data) use ($bar) {
			$data->addToIndex();
			$bar->advance(2000);

		});
		$bar->finish();
		echo PHP_EOL;
	}


}
