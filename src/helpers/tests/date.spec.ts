import { formatToDateTime } from "@/helpers/date";

describe("helpers -> date", () => {
  it("should format date to local date time", () => {
    const date = "2022-01-01T00:00:00.000Z";
    expect(formatToDateTime(date)).toBe("2022-01-01 01:00");
  });
});
