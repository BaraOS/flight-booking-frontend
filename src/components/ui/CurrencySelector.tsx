import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateSelectedCurrency } from "@/store/flightSearch/flightSearchSlice";

const CurrencySelector = () => {
  const [open, setOpen] = useState(false);

  const { selectedCurrency } = useSelector((state: RootState) => ({
    selectedCurrency: state.flightSearch.selectedCurrency,
  }));

  const dispatch = useDispatch();

  const currencies = [
    {
      value: "ARS",
      label: "Argentine peso",
    },
    {
      value: "AUD",
      label: "Australian dollar",
    },
    {
      value: "AZN",
      label: "Azerbaijani manat",
    },
    {
      value: "BHD",
      label: "Bahraini dinar",
    },
    {
      value: "BRL",
      label: "Brazilian real",
    },
    {
      value: "BGN",
      label: "Bulgarian lev",
    },
    {
      value: "CAD",
      label: "Canadian dollar",
    },
    {
      value: "CLP",
      label: "Chilean peso",
    },
    {
      value: "CNY",
      label: "Chinese yuan",
    },
    {
      value: "COP",
      label: "Colombian peso",
    },
    {
      value: "CZK",
      label: "Czech koruna",
    },
    {
      value: "DKK",
      label: "Danish krone",
    },
    {
      value: "EGP",
      label: "Egyptian pound",
    },
    {
      value: "EUR",
      label: "Euro",
    },
    {
      value: "FJD",
      label: "Fiji dollar",
    },
    {
      value: "GEL",
      label: "Georgian lari",
    },
    {
      value: "HKD",
      label: "Hong Kong dollar",
    },
    {
      value: "HUF",
      label: "Hungarian forint",
    },
    {
      value: "ISK",
      label: "Icelandic króna",
    },
    {
      value: "INR",
      label: "Indian rupee",
    },
    {
      value: "IDR",
      label: "Indonesian rupiah",
    },
    {
      value: "JPY",
      label: "Japanese yen",
    },
    {
      value: "JOD",
      label: "Jordanian dinar",
    },
    {
      value: "KGS",
      label: "Kyrgyzstani som",
    },
    {
      value: "KWD",
      label: "Kuwaiti dinar",
    },
    {
      value: "MOP",
      label: "Macanese pataca",
    },
    {
      value: "MYR",
      label: "Malaysian ringgit",
    },
    {
      value: "MXN",
      label: "Mexican Peso",
    },
    {
      value: "MDL",
      label: "Moldovan Leu",
    },
    {
      value: "NAD",
      label: "Namibian dollar",
    },
    {
      value: "TWD",
      label: "New Taiwan dollar",
    },
    {
      value: "NZD",
      label: "New Zealand dollar",
    },
    {
      value: "NOK",
      label: "Norwegian krone",
    },
    {
      value: "OMR",
      label: "Omani rial",
    },
    {
      value: "PLN",
      label: "Polish złoty",
    },
    {
      value: "GBP",
      label: "Pound sterling",
    },
    {
      value: "QAR",
      label: "Qatari riyal",
    },
    {
      value: "RON",
      label: "Romanian new leu",
    },
    {
      value: "RUB",
      label: "Russian rouble",
    },
    {
      value: "SAR",
      label: "Saudi riyal",
    },
    {
      value: "SDG",
      label: "Sudanese pound",
    },
    {
      value: "SSP",
      label: "South Sudanese pound",
    },
    {
      value: "SGD",
      label: "Singapore dollar",
    },
    {
      value: "ZAR",
      label: "South African rand",
    },
    {
      value: "KRW",
      label: "South Korean Won",
    },
    {
      value: "SEK",
      label: "Swedish krona/kronor",
    },
    {
      value: "CHF",
      label: "Swiss Franc",
    },
    {
      value: "TRY",
      label: "Turkish lira",
    },
    {
      value: "USD",
      label: "United States dollar",
    },
    {
      value: "UAH",
      label: "Ukrainian hryvnia",
    },
    {
      value: "XOF",
      label: "CFA franc BCEAO",
    },
  ];
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between bg-transparent border-none text-white",
              !selectedCurrency && "text-muted-foreground"
            )}
            aria-expanded={open}
          >
            {selectedCurrency ?? "Select Currency"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((currency, index) => (
                  <CommandItem
                    value={currency.value}
                    key={index}
                    keywords={[currency.label]}
                    onSelect={(currentValue) => {
                      dispatch(updateSelectedCurrency(currentValue));
                      setOpen(false);
                    }}
                  >
                    {currency.label} ({currency.value})
                    <Check
                      className={cn("ml-auto", currency.value === selectedCurrency ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CurrencySelector;
