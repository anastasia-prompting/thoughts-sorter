Add-Type -AssemblyName System.Drawing

Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class CheckerStripper {
    public static int Strip(string path, int minBg, int maxNeutralDelta) {
        int cleared = 0;
        string tmp = path + ".tmp.png";
        using (var img = Image.FromFile(path))
        using (var bmp = new Bitmap(img)) {
            int w = bmp.Width, h = bmp.Height;
            var rect = new Rectangle(0, 0, w, h);
            var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int stride = data.Stride;
            byte[] bytes = new byte[stride * h];
            Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);

            bool[] visited = new bool[w * h];
            var queue = new Queue<int>();

            // seed from all four edges
            Action<int, int> seed = (x, y) => {
                int vi = y * w + x;
                if (visited[vi]) return;
                visited[vi] = true;
                int idx = y * stride + x * 4;
                byte b = bytes[idx], g = bytes[idx + 1], r = bytes[idx + 2];
                int mn = Math.Min(r, Math.Min(g, b));
                int mx = Math.Max(r, Math.Max(g, b));
                if (mn >= minBg && (mx - mn) <= maxNeutralDelta) queue.Enqueue(vi);
            };
            for (int x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
            for (int y = 0; y < h; y++) { seed(0, y); seed(w - 1, y); }

            int[] dx = { -1, 1, 0, 0 };
            int[] dy = { 0, 0, -1, 1 };

            while (queue.Count > 0) {
                int vi = queue.Dequeue();
                int x = vi % w;
                int y = vi / w;
                int idx = y * stride + x * 4;
                bytes[idx] = 0;
                bytes[idx + 1] = 0;
                bytes[idx + 2] = 0;
                bytes[idx + 3] = 0;
                cleared++;
                for (int k = 0; k < 4; k++) {
                    int nx = x + dx[k], ny = y + dy[k];
                    if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
                    int nvi = ny * w + nx;
                    if (visited[nvi]) continue;
                    visited[nvi] = true;
                    int nidx = ny * stride + nx * 4;
                    byte b2 = bytes[nidx], g2 = bytes[nidx + 1], r2 = bytes[nidx + 2];
                    int mn2 = Math.Min(r2, Math.Min(g2, b2));
                    int mx2 = Math.Max(r2, Math.Max(g2, b2));
                    if (mn2 >= minBg && (mx2 - mn2) <= maxNeutralDelta) queue.Enqueue(nvi);
                }
            }

            Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
            bmp.UnlockBits(data);
            bmp.Save(tmp, ImageFormat.Png);
        }
        File.Delete(path);
        File.Move(tmp, path);
        return cleared;
    }
}
"@

$targets = @(
    "src/assets/moon-observatory/bubbles/bubble-01.png",
    "src/assets/moon-observatory/bubbles/bubble-02.png",
    "src/assets/moon-observatory/bubbles/bubble-03.png",
    "src/assets/moon-observatory/bubbles/bubble-04.png",
    "src/assets/moon-observatory/npc/npc-cloud-moth-idle.png",
    "src/assets/moon-observatory/npc/npc-cloud-moth-blink.png",
    "src/assets/moon-observatory/npc/npc-cloud-moth-glow.png"
)

foreach ($t in $targets) {
    $abs = (Resolve-Path $t).Path
    $cleared = [CheckerStripper]::Strip($abs, 215, 6)
    Write-Host ("{0,-65} cleared {1,8} px" -f $t, $cleared)
}
