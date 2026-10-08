"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// ssr: false hanya boleh dipakai di Client Component, makanya dibuat wrapper ini.
const MusicButton = dynamic(() => import("./MusicButton"), { ssr: false });

export default function LazyMusicButton(
  props: ComponentProps<typeof MusicButton>
) {
  return <MusicButton {...props} />;
}
