import { expect, test } from "vitest";
import { AudioProcessor } from "@/lib/audio-processor";
import { AudioContext, MediaStreamAudioSourceNode } from "node-web-audio-api";

test("initializes", () => {
  // TODO: mock AudioProcessor instance args (and probably refactor AudioProcessor constructor)
  // const audioProcessor = new AudioProcessor(new AudioContext(), new MediaStream());
  // expect(audioProcessor).toBeDefined();
});