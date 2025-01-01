import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
interface HistoryItem {
  score: number;
  miscliks: number;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule, FormsModule, PopupComponent],
})
export class GameComponent {
  @ViewChild('gameBoard') gameBoardRef!: ElementRef; // Reference to .game-board
  misclicks: number = 0; // Track the number of misclicks
  difficulty: string = 'medium';
  history: HistoryItem[] = [];
  gameDuration: number = 30; // Default game duration (in seconds)
  curentGameDuration: number = 30;
  circleX: number = 0; // Circle's X position
  circleY: number = 0; // Circle's Y position
  isGameRunning: boolean = false;
  hasGameEnded: boolean = false;
  totalScore: number = 0;
  timerInterval: any;
  @ViewChild('progressBar') progressBarRef!: ElementRef; // Reference to the progress bar element

  ngAfterViewInit(): void {
    this.moveCircleToCenter(); // Ensure the circle is centered when the component loads
  }

  @HostListener('window:resize')
  onResize(): void {
    this.moveCircleToCenter(); // Recalculate the circle position on window resize
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isGameRunning) {
      // Start the game when Enter is pressed and the game is not already running
      this.startGame();
    }
  }

  setDifficulty(level: string): void {
    this.difficulty = level;
    // Update the board size by applying a different CSS class
    const parent = this.gameBoardRef.nativeElement as HTMLElement;
    parent.className = `game-board ${level}`;
    this.moveCircleToCenter(); // Recalculate the circle position
  }

  startGame(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.totalScore = 0;
    this.misclicks = 0;
    this.isGameRunning = true;
    this.hasGameEnded = false;

    // Add the 'bar-active' class to the progress bar

    const progressBar = this.progressBarRef.nativeElement as HTMLElement;
    progressBar.style.setProperty('--game-duration', `${this.gameDuration}s`);

    progressBar.classList.add('bar-active');
    this.moveCircleToCenter(); // Move circle to center before the game starts

    this.timerInterval = setInterval(() => {
      this.curentGameDuration--; // Decrease the game duration every second

      if (this.curentGameDuration <= 0) {
        this.curentGameDuration = 0;
        this.endGame(); // End game when time is up
      }
    }, 1000);
  }
  setTimeHandler(time: number): void {
    this.gameDuration = time;
    this.curentGameDuration = time;
  }
  updateTimer(): void {
    // Update the progress bar width based on the remaining time
    // const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    // if (progressBar) {
    //   progressBar.style.width = `${(this.gameDuration / 30) * 100}%`;
    // }

    // Update the timer text (remaining seconds)
    const timeLeftElement = document.querySelector('.time-left') as HTMLElement;
    if (timeLeftElement) {
      timeLeftElement.textContent = `${this.curentGameDuration}s`;
    }
  }

  endGame(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.history.push({ score: this.totalScore, miscliks: this.misclicks });
    this.isGameRunning = false;
    this.hasGameEnded = true;
    this.curentGameDuration = this.gameDuration;
    // Remove the 'bar-active' class from the progress bar
    const progressBar = this.progressBarRef.nativeElement as HTMLElement;
    progressBar.classList.remove('bar-active');
  }

  resetGame(): void {
    this.resetTimer();
    this.misclicks = 0; // Reset misclicks
    this.totalScore = 0;
    this.isGameRunning = false;
    this.hasGameEnded = false;
    this.moveCircleToCenter(); // Reset circle position
  }

  resetTimer(): void {
    // Stop any running timer and reset to default duration
    clearInterval(this.timerInterval);
    // this.gameDuration = 30;
    this.curentGameDuration = this.gameDuration;
    this.updateTimer(); // Reset the timer display
  }

  moveCircleToCenter(): void {
    if (!this.gameBoardRef || !this.isGameRunning) return; // Ensure the game is running and the reference exists

    const parent = this.gameBoardRef.nativeElement as HTMLElement;
    const circleSize =
      (parent.offsetWidth *
        parseFloat(
          getComputedStyle(parent).getPropertyValue('--circle-size')
        )) /
      100;
    const centerX = parent.offsetWidth / 2 - circleSize / 2; // Calculate center X considering circle size
    const centerY = parent.offsetHeight / 2 - circleSize / 2; // Calculate center Y considering circle size

    this.circleX = centerX;
    this.circleY = centerY;

    this.keepCircleInsideBounds(); // Ensure the circle stays inside bounds
  }

  moveCircleRandomly(): void {
    const parent = this.gameBoardRef.nativeElement as HTMLElement;
    const maxX = parent.offsetWidth - parent.offsetWidth * 0.04; // Adjust based on circle size
    const maxY = parent.offsetHeight - parent.offsetHeight * 0.04;

    this.circleX = Math.random() * maxX;
    this.circleY = Math.random() * maxY;

    this.keepCircleInsideBounds(); // Ensure it's always inside bounds
  }

  keepCircleInsideBounds(): void {
    const parent = this.gameBoardRef.nativeElement as HTMLElement;
    const maxX = parent.offsetWidth - parent.offsetWidth * 0.04; // Max X position
    const maxY = parent.offsetHeight - parent.offsetHeight * 0.04; // Max Y position

    // Ensure the circle is within the valid range
    this.circleX = Math.min(Math.max(this.circleX, 0), maxX);
    this.circleY = Math.min(Math.max(this.circleY, 0), maxY);
  }
  boardClickHandler(): void {
    this.misclicks += 1;
    this.totalScore <= 0 ? (this.totalScore = 0) : (this.totalScore -= 10);
  }
  circleClickHandler(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isGameRunning) return;
    this.totalScore += 50;
    this.moveCircleRandomly();

    // const parent = this.gameBoardRef.nativeElement as HTMLElement;
    // const rect = parent.getBoundingClientRect(); // Get the position of the game board in the viewport
    // console.log('rect = ', rect);

    // // Calculate the circle's boundaries in the viewport
    // const circleLeft = rect.left + this.circleX;
    // const circleTop = rect.top + this.circleY;
    // const circleSize = parent.offsetWidth * 0.04; // Circle size as percentage
    // const circleRight = circleLeft + circleSize;
    // const circleBottom = circleTop + circleSize;

    // // Check if the click is inside the circle
    // const isInsideCircle =
    //   event.clientX >= circleLeft &&
    //   event.clientX <= circleRight &&
    //   event.clientY >= circleTop &&
    //   event.clientY <= circleBottom;

    // if (isInsideCircle) {
    //   // Calculate the score based on click accuracy
    //   const circleCenterX = circleLeft + circleSize / 2;
    //   const circleCenterY = circleTop + circleSize / 2;
    //   const distance = Math.sqrt(
    //     Math.pow(event.clientX - circleCenterX, 2) +
    //       Math.pow(event.clientY - circleCenterY, 2)
    //   );

    //   let score = 50; // Base score
    //   if (distance < 25) {
    //     // Bonus for accurate clicks
    //     score += 25 - distance;
    //   }

    //   this.totalScore += Math.round(score);
    // } else {
    //   // Misclick detected
    //   this.misclicks += 1;
    //   this.totalScore = Math.max(this.totalScore - 10, 0); // Deduct 10 points but ensure totalScore is not below 0
    // }

    // Move the circle to a random position
  }
}
