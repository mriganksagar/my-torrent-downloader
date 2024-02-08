export function formatBytesToBigBytes(
  size: number,
  speed: boolean = false
): string {
  // this convert the size from bytes to bigger Units such as KB , MB, GB to make it readable
  enum SizeUnit {
    B,
    KB,
    MB,
    GB,
    TB,
  }
  let sizeUnit = SizeUnit.B;
  while (size >= 1000) {
    size = size / 1024;
    sizeUnit++;
  }
  let sizeFormated = size.toFixed(1);
  sizeFormated = sizeFormated.replace(/\.0$/, "");
  const SizeUnitKeys = Object.values(SizeUnit);
  let formattedBytes = sizeFormated + " " + SizeUnitKeys[sizeUnit];
  if (speed) formattedBytes += "/s";
  return formattedBytes;
}

export function formatDownloadingProgress(progress: number): string {
  // make progress a readable string
  return (progress * 100).toFixed(2).replace(/\.00$/, "") + "% Downloaded";
}
