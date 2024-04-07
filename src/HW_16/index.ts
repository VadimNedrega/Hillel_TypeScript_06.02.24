{
    enum Format {
        MP3,
        MP4,
        AVI
    }

    class File {
        constructor(readonly name: string, readonly format: Format) {
        }
    }

    //абстракція
    abstract class FileFormatPlayer {
        abstract currentFormat: Format | null;

        //наслідування реалізації метода
        playFile(file: File): void {
            console.log(`Now playing file: ${file.name}`);
        };
    }

    class MP3Player extends FileFormatPlayer {
        currentFormat: Format | null = Format.MP3;
    }

    class MP4Player extends FileFormatPlayer {
        currentFormat: Format | null = Format.MP4;
    }

    class AVIPlayer extends FileFormatPlayer {
        currentFormat: Format | null = Format.AVI;
    }

    interface IPlayer {
        play(): void;
        stop(): void;
        nextFile(): void;
        prevFile(): void;
    }

    class MultimediaPlayer implements IPlayer {
        private readonly files: File [] = [];
        private readonly formatPlayers: FileFormatPlayer [] = [];
        private currentFile: File | null = null;
        private currentFormat: Format | null = null;

        constructor(files: File[]) {
            this.files = files;

            //композиція, при додаванні нового плеєра буде оновлюватися
            this.formatPlayers = [
                new MP3Player(),
                new MP4Player(),
                new AVIPlayer(),
            ];
        }

        addFile(file: File): void {
            this.files.push(file);
        }

        play(): void {
            if (this.files.length > 0) {
                this.currentFile = this.files[0];
                this.playCurrentFile(this.currentFile);
            } else {
                console.warn("No files added to the player.");
            }
        }

        nextFile(): void {
            if (this.currentFile !== null){
                const currentIndex = this.files.indexOf(this.currentFile);
                currentIndex === this.files.length-1 ?  this.currentFile = this.files[0] : this.currentFile = this.files[currentIndex + 1];
                this.playCurrentFile(this.currentFile);
            }
        }

        prevFile(): void {
            if (this.currentFile !== null){
                const currentIndex = this.files.indexOf(this.currentFile);
                currentIndex === 0 ?  this.currentFile = this.files[this.files.length - 1] : this.currentFile = this.files[currentIndex - 1];
                this.playCurrentFile(this.currentFile);
            }
        }

        stop(): void {
            console.log("Stop play");
        }

        private playCurrentFile(file: File): void {
            this.currentFormat = file.format;
            const formatPlayer = this.formatPlayers.find(player => player.currentFormat === this.currentFormat)

            formatPlayer? formatPlayer.playFile(file) : console.warn(`Sorry, can not open ${file}.`);
        }
    }

    //реалізація прикладу
    const file1 = new File("song", Format.MP3);
    const file2 = new File("film", Format.MP4);
    const file3 = new File("movie", Format.AVI);
    const files = [file1, file2, file3];

    const player = new MultimediaPlayer(files);
    player.addFile(new File("new song", Format.MP3))

    player.play();
    player.prevFile();
    player.nextFile();
    player.nextFile();
    player.nextFile();
    player.nextFile();
    player.stop();
}