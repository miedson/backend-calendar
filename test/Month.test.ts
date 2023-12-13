import Month from "../src/domain/entities/Calendar";

test("Deve retornar os dias do mês informado", function() {
    const month = new Month(2023, 5);
    expect(month.getMonth().length).toBeGreaterThan(0)
});