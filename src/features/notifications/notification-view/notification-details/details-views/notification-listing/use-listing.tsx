import * as React from "react";
import useAppSelectors from "@/store/use-app-selectors";
import { MyInvestmentMarketplaceNotification, Notification,  } from "@/types/notification.types";
import { useQuery } from "react-query";
import { amountSeparator } from "@/lib/amount-separator";
import getUserById from "@/services/users/get-user-by-id";
import ensureError from "@/lib/ensure-error";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import getInvestmentDetails from "@/services/investments/get-investment-details";

export default function useListing(data:Notification) {
  const { currency, account } = useAppSelectors("account");

  const notificationData=data.data
  const activeUserIsSeller = React.useMemo(
    () => account.id === notificationData?.listing?.seller_product_id,
    [account.id, notificationData?.listing?.seller_product_id],
  );

  const productId = notificationData?.listing?.product_id;

  const buyerId = !activeUserIsSeller
    ? String(notificationData?.listing?.buyer_product_id ?? "")
    : null;

  const {
    isFetching,
    isError,
    error,
    data: investmentDetails,
  } = useQuery([productId], () => getInvestmentDetails({id: productId }), {
    enabled:  productId && true,
  });

  const { isFetching: fetchingUser, data: userData } = useQuery(
    ["user-by-id", buyerId],
    () => getUserById({ id: buyerId ?? "" }),
    {
      enabled: (!buyerId || !open) && false,
      onError(err) {
        const errMsg = ensureError(err).message;
        toast.error(errMsg);
      },
    },
  );




  const getDate = (date: string) =>
    new Date(date).toLocaleDateString("en-us", {
      dateStyle: "full",
    });


  const details = notificationData?.listing as MyInvestmentMarketplaceNotification;


  const productDetails = {
    date: getDate(details?.created_at),
    investment_type: investmentDetails?.category?.display_title,
    counter_price_per_unit: `${currency.sign} ${amountSeparator(details?.counter_price_per_unit)}`,
    purchasing_price: `${currency.sign} ${amountSeparator(details?.offer?.offer_price)}`,
    purchasing_units: amountSeparator(details?.offer?.units),
    status: <Badge className="bg-primary-500 !w-fit"> {details?.status} </Badge>,
  };



 

  return {
    isFetching: isFetching || fetchingUser,
    isError,
    error,
    userData,
    activeUserIsSeller,
    productDetails,
    data,
    details,
    account,
  };
}
