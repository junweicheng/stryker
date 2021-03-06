import { MatchedMutant, MutantResult } from '@stryker-mutator/api/report';
import ProgressKeeper from './ProgressKeeper';
import ProgressBar from './ProgressBar';

export default class ProgressBarReporter extends ProgressKeeper {
  private progressBar: ProgressBar;

  public onAllMutantsMatchedWithTests(matchedMutants: ReadonlyArray<MatchedMutant>): void {
    super.onAllMutantsMatchedWithTests(matchedMutants);
    const progressBarContent =
      `Mutation testing  [:bar] :percent (ETC :etc) :tested/:total tested (:survived survived)`;

    this.progressBar = new ProgressBar(progressBarContent, {
      complete: '=',
      incomplete: ' ',
      stream: process.stdout,
      total: this.progress.total,
      width: 50
    });
  }

  public onMutantTested(result: MutantResult): void {
    const ticksBefore = this.progress.tested;
    super.onMutantTested(result);

    const progressBarContent = { ...this.progress, etc: this.getEtc() };

    if (ticksBefore < this.progress.tested) {
      this.tick(progressBarContent);
    } else {
      this.render(progressBarContent);
    }
  }

  private tick(tickObj: object): void {
    this.progressBar.tick(tickObj);
  }

  private render(renderObj: object): void {
    this.progressBar.render(renderObj);
  }
}
