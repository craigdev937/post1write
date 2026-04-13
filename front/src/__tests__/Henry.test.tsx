import { expect, test } from "@rstest/core";
import { sayHenry } from "../components/Henry";

test("should sayHenry correctly", () => {
    expect(sayHenry()).toBe("Henry Quartermain");
});



