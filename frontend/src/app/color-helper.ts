export class ColorHelper {

    public getColors(dataCount: number, isRandom: boolean) {

        let colors = [];
        let percent = 230 / dataCount;

        //Ramdom colors
        if (isRandom) {
            for (let index = dataCount; index >= 1; index--) {
                colors.push('#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1, 6));
            }
        }

        //Specific colors
        else {
            for (let index = dataCount; index >= 1; index--) {
                colors.push(`rgba(${Math.round(index * 25)}, 200, ${200 - Math.round((index * percent) / 4)},1)`);
            }
        }

        return colors.reverse();
    }
}
